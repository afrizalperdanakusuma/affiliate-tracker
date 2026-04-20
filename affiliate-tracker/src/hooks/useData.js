// src/hooks/useData.js
// Central data hook — loads from IndexedDB, exposes refresh

import { useState, useEffect, useCallback } from 'react'
import { openDB, getAllRecords, clearStore } from '../utils/db'

export function useData() {
  const [adsData, setAdsData]           = useState([])
  const [affiliateData, setAffiliateData] = useState([])
  const [loading, setLoading]           = useState(true)
  const [version, setVersion]           = useState(0)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const db = await openDB()
      const [ads, aff] = await Promise.all([
        getAllRecords(db, 'ads'),
        getAllRecords(db, 'affiliate'),
      ])
      setAdsData(ads.sort((a, b) => a.date.localeCompare(b.date)))
      setAffiliateData(aff.sort((a, b) => a.date.localeCompare(b.date)))
    } catch (e) {
      console.error('Failed to load data:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [version, loadData])

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  const clearData = useCallback(async (type) => {
    const db = await openDB()
    await clearStore(db, type === 'ads' ? 'ads' : 'affiliate')
    refresh()
  }, [refresh])

  // Merged dataset: join ads + affiliate by date+campaign key
  const mergedData = (() => {
    const map = {}
    for (const a of adsData) {
      if (!map[a.id]) map[a.id] = { date: a.date, campaign: a.campaign, spend: 0, commission: 0, orders: 0, clicks: 0, impressions: 0, results: 0 }
      map[a.id].spend       += a.spend || 0
      map[a.id].clicks      += a.clicks || 0
      map[a.id].impressions += a.impressions || 0
      map[a.id].results     += a.results || 0
    }
    for (const s of affiliateData) {
      if (!map[s.id]) map[s.id] = { date: s.date, campaign: s.campaign, spend: 0, commission: 0, orders: 0, clicks: 0, impressions: 0, results: 0 }
      map[s.id].commission += s.commission || 0
      map[s.id].orders     += s.orders || 0
    }
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
  })()

  // Summary stats
  const stats = (() => {
    const totalSpend      = mergedData.reduce((s, r) => s + r.spend, 0)
    const totalRevenue    = mergedData.reduce((s, r) => s + r.commission, 0)
    const netProfit       = totalRevenue - totalSpend
    const roas            = totalSpend > 0 ? totalRevenue / totalSpend : 0
    const totalOrders     = mergedData.reduce((s, r) => s + r.orders, 0)
    const totalImpressions = mergedData.reduce((s, r) => s + r.impressions, 0)
    const totalClicks     = mergedData.reduce((s, r) => s + r.clicks, 0)
    const ctr             = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
    const cpo             = totalOrders > 0 ? totalSpend / totalOrders : 0
    return { totalSpend, totalRevenue, netProfit, roas, totalOrders, totalImpressions, totalClicks, ctr, cpo }
  })()

  // By-date aggregation for charts
  const byDate = (() => {
    const map = {}
    for (const r of mergedData) {
      if (!map[r.date]) map[r.date] = { date: r.date, spend: 0, commission: 0, profit: 0 }
      map[r.date].spend      += r.spend
      map[r.date].commission += r.commission
      map[r.date].profit     += (r.commission - r.spend)
    }
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
  })()

  // By-campaign aggregation
  const byCampaign = (() => {
    const map = {}
    for (const a of adsData) {
      if (!map[a.campaign]) map[a.campaign] = { campaign: a.campaign, spend: 0, commission: 0, orders: 0 }
      map[a.campaign].spend += a.spend || 0
    }
    for (const s of affiliateData) {
      if (!map[s.campaign]) map[s.campaign] = { campaign: s.campaign, spend: 0, commission: 0, orders: 0 }
      map[s.campaign].commission += s.commission || 0
      map[s.campaign].orders     += s.orders || 0
    }
    return Object.values(map).map(r => ({
      ...r,
      profit: r.commission - r.spend,
      roas:   r.spend > 0 ? r.commission / r.spend : 0,
      cpo:    r.orders > 0 ? r.spend / r.orders : 0,
    }))
  })()

  return {
    adsData, affiliateData,
    mergedData, byDate, byCampaign,
    stats, loading,
    refresh, clearData,
  }
}
