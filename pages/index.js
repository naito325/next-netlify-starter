// pages/index.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export default function Home() {
  const { query } = useRouter()
  const title = useMemo(() => (typeof query.title === 'string' ? query.title : ''), [query.title])
  const gpt   = useMemo(() => (typeof query.gpt   === 'string' ? query.gpt   : ''), [query.gpt])

  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const handleClick = async () => {
    if (!gpt) {
      setStatus('⚠️ ChatGPTリンクが無効です。メールのリンク生成を確認してください。')
      return
    }
    if (busy) return
    setBusy(true)
    setStatus('⏳ 見出しをコピーしてChatGPTを開いています…')

    // 1) 見出しコピー（失敗しても先へ進む）
    try {
      await navigator.clipboard.writeText(title || '')
      setStatus('✅ 見出しをコピーしました。ChatGPTを開きます…')
    } catch {
      setStatus('⚠️ 自動コピーに失敗しましたが、ChatGPTを開きます…（必要なら手動で貼り付けてください）')
    }

    // 2) 同一タブでChatGPTへ（新規タブは使わない）
    try {
      window.top.location.href = gpt
    } catch {
      window.location.href = gpt
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>見出しをコピーしてChatGPTへ</title>
      </Head>

      <div className="wrap">
        <div className="card">
          <div className="title">ボタンひとつで「コピー → ChatGPTを開く」を行います。</div>
          <div>見出し：<code className="code">{title || '(未取得)'}</code></div>
          <div className="note">※ Netlify から直接 ChatGPT を開くので、Googleドライブのエラーは回避されます。</div>

          <button className="btn btn-primary" onClick={handleClick} disabled={busy}>
            {busy ? '処理中…' : '見出しをコピーして ChatGPT を開く'}
          </button>

          <div className="note status">{status}</div>

          <div className="fallback">
            <span className="note">開けない場合：</span>{' '}
            <a href={gpt || '#'} rel="noreferrer">
              直接ChatGPTを開く（コピーなし）
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap { font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; line-height:1.8; padding:20px; }
        .card { border:1px solid #eee; border-radius:12px; padding:16px; background:#fff; max-width:720px; margin:0 auto; }
        .title { font-weight:700; margin-bottom:6px; }
        .note { font-size:12px; color:#666; }
        .status { margin-top:10px; min-height:1.2em; }
        .code { background:#f6f8fa; border:1px solid #eee; padding:3px 6px; border-radius:6px; }
        .btn { display:block; width:100%; padding:12px 14px; border-radius:10px; text-align:center; font-weight:600; border:none; cursor:pointer; }
        .btn-primary { background:#1a73e8; color:#fff; margin-top:14px; }
        .btn[disabled] { opacity:0.7; cursor:default; }
        .fallback { margin-top:12px; font-size:13px; }
      `}</style>
    </>
  )
}
