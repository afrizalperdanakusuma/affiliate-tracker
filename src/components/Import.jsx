// src/pages/Import.jsx
import { useState, useRef } from 'react'
import { Icons } from '../components/Icons'
import { openDB, upsertRecords } from '../utils/db'
import { processCSVFile, parseMetaAds, parseShopeeAffiliate } from '../utils/csvParser'

function DropZone({ type, file, isDragOver, onDragOver, onDragLeave, onDrop, onFileSelect }) {
  const inputRef = useRef()

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
        <span className={type === 'meta' ? 'badge badge-meta' : 'badge badge-shopee'}>
          {type === 'meta' ? 'Meta Ads' : 'Shopee Affiliate'}
        </span>
        {'  '}
        {type === 'meta' ? 'Laporan Kampanye' : 'Laporan Komisi'}
      </div>

      <div
        className={`drop-zone ${isDragOver ? 'over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); onDragOver() }}
        onDragLeave={onDragLeave}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onDrop(f) }}
      >
        <div className="dz-icon">
          {type === 'meta' ? <Icons.Chart /> : <Icons.Money />}
        </div>
        <div className="dz-title">{file ? file.name : 'Drop CSV di sini'}</div>
        <div className={file ? 'dz-filename' : 'dz-sub'}>
          {file ? '✓ Siap diproses' : 'atau klik untuk pilih file .csv'}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={e => { if (e.target.files[0]) onFileSelect(e.target.files[0]) }}
      />
    </div>
  )
}

export default function Import({ onDataChange }) {
  const [metaFile, setMetaFile]     = useState(null)
  const [shopeeFile, setShopeeFile] = useState(null)
  const [logs, setLogs]             = useState([])
  const [loading, setLoading]       = useState(false)
  const [dragMeta, setDragMeta]     = useState(false)
  const [dragShopee, setDragShopee] = useState(false)

  const addLog = (entries) => {
    setLogs(prev => [...entries, '', ...prev])
  }

  const processFile = async (file, type) => {
    setLoading(true)
    const lb = [`=== IMPORT ${type.toUpperCase()}: ${file.name} ===`]

    try {
      const rows = await processCSVFile(file, type)
      lb.push(`Total baris ditemukan: ${rows.length}`)

      const db = await openDB()
      const logFn = (msg) => lb.push(msg)

      let records, storeName
      if (type === 'meta') {
        records   = parseMetaAds(rows, logFn)
        storeName = 'ads'
      } else {
        records   = parseShopeeAffiliate(rows, logFn)
        storeName = 'affiliate'
      }

      const { inserted, updated } = await upsertRecords(db, storeName, records)
      lb.push(`✅ Selesai: ${inserted} data baru, ${updated} data diperbarui (upsert — tidak ada duplikasi)`)
      onDataChange()
    } catch (err) {
      lb.push(`❌ Error: ${err.message}`)
    }

    addLog(lb)
    setLoading(false)
  }

  const handleClear = async (type) => {
    const { clearStore, openDB: openDBFn } = await import('../utils/db')
    const db = await openDBFn()
    await clearStore(db, type === 'meta' ? 'ads' : 'affiliate')
    addLog([`🗑️ Data ${type === 'meta' ? 'Meta Ads' : 'Shopee Affiliate'} berhasil dihapus`])
    onDataChange()
  }

  return (
    <div>
      {/* Upload area */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Upload File CSV</span>
          {loading && <span className="loading-bar">⏳ Memproses...</span>}
        </div>

        <div className="upload-grid">
          <DropZone
            type="meta" file={metaFile}
            isDragOver={dragMeta}
            onDragOver={() => setDragMeta(true)}
            onDragLeave={() => setDragMeta(false)}
            onDrop={f => { setMetaFile(f); processFile(f, 'meta') }}
            onFileSelect={f => { setMetaFile(f); processFile(f, 'meta') }}
          />
          <DropZone
            type="shopee" file={shopeeFile}
            isDragOver={dragShopee}
            onDragOver={() => setDragShopee(true)}
            onDragLeave={() => setDragShopee(false)}
            onDrop={f => { setShopeeFile(f); processFile(f, 'shopee') }}
            onFileSelect={f => { setShopeeFile(f); processFile(f, 'shopee') }}
          />
        </div>

        <div className="action-row">
          <button className="btn btn-danger" onClick={() => handleClear('meta')}>
            <Icons.Trash /> Hapus data Meta
          </button>
          <button className="btn btn-danger" onClick={() => handleClear('shopee')}>
            <Icons.Trash /> Hapus data Shopee
          </button>
        </div>
      </div>

      {/* Import log */}
      {logs.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Log Import</span>
            <button className="btn" onClick={() => setLogs([])}>Bersihkan</button>
          </div>
          <div className="log-box">
            {logs.map((l, i) => <div key={i}>{l || '\u00a0'}</div>)}
          </div>
        </div>
      )}

      {/* Format guide */}
      <div className="format-guide">
        <div className="panel-title" style={{ color: 'var(--g700)' }}>Format CSV yang didukung</div>
        <div className="format-guide-grid">
          <div className="format-col">
            <div className="format-col-title">Meta Ads (export dari Meta Business)</div>
            <ul>
              <li>Tanggal / Tanggal mulai</li>
              <li>Nama kampanye</li>
              <li>Jumlah yang dibelanjakan (IDR)</li>
              <li>Tayangan</li>
              <li>Klik (semua)</li>
            </ul>
          </div>
          <div className="format-col">
            <div className="format-col-title">Shopee Affiliate (export dari dashboard)</div>
            <ul>
              <li>Tanggal</li>
              <li>Nama Kampanye</li>
              <li>Komisi Kotor(Rp) / Total Komisi</li>
              <li>Pesanan terkonfirmasi</li>
              <li>Klik</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
