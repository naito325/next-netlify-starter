// pages/index.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

export default function Home() {
  const { query } = useRouter()
  const title = useMemo(() => (typeof query.title === 'string' ? query.title : ''), [query.title])
  const gpt   = useMemo(() => (typeof query.gpt   === 'string' ? query.gpt   : ''), [query.gpt])

  const [status, setStatus] = useState('')
  const [showUrl, setShowUrl] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(title || '')
      setStatus('✅ 見出しをコピーしました。')
    } catch {
      setStatus('⚠️ 自動コピーに失敗。必要なら手動コピーしてください。')
    }
  }

  const onOpen = () => {
    if (!gpt) { setStatus('⚠️ ChatGPTリンクが無効です。'); return; }
    try { window.top.location.href = gpt } catch { window.location.href = gpt }
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
          <div className="title">見出しをコピーしてから、ChatGPTへ移動します（同一タブ）。</div>
          <div>見出し：<code className="code">{title || '(未取得)'}</code></div>
          <div className="note">※ Googleドメインは経由しません。Netlifyから直接ChatGPTを開きます。</div>
          <div className="note status">{status}</div>

          <button className="btn btn-copy" onClick={onCopy}>① 見出しをコピー</button>
          <button className="btn btn-go" onClick={onOpen}>② ChatGPT を開く（同一タブ）</button>
          <button className="btn btn-url" onClick={() => setShowUrl(true)}>リンクが開けない場合はこちら</button>

          {showUrl && (
            <div className="note urlbox">
              うまく開けない場合は、下のリンクを<strong>長押し→“開く”</strong>で開いてください：<br />
              <a href={gpt || '#'} rel="noreferrer">{gpt || '(リンク未設定)'}</a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .wrap { font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; line-height:1.8; padding:20px; }
        .card { border:1px solid #eee; border-radius:12px; padding:16px; background:#fff; max-width:720px; margin:0 auto; }
        .title { font-weight:700; margin-bottom:6px; }
        .note { font-size:12px; color:#666; }
        .status { margin-top:6px; }
        .code { background:#f6f8fa; border:1px solid #eee; padding:3px 6px; border-radius:6px; }
        .btn { display:block; width:100%; padding:12px 14px; border-radius:10px; text-align:center; font-weight:600; border:none; cursor:pointer; }
        .btn-copy { background:#111; color:#fff; margin-top:12px; }
        .btn-go   { background:#1a73e8; color:#fff; margin-top:10px; }
        .btn-url  { background:#f0f3f6; color:#111; margin-top:10px; }
        .urlbox { border-top:1px dashed #ddd; margin-top:12px; padding-top:12px; }
      `}</style>
    </>
  )
}
