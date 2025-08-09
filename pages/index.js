export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#0070f3' }}>タスク自動化アプリへようこそ！</h1>
      <p>このページは Next.js と Netlify を使ってデプロイされています。</p>
      <p>更新が反映されていれば、ここに表示されるテキストが変わっているはずです。</p>
      <a
        href="https://github.com/naito325/next-netlify-starter"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none'
        }}
      >
        GitHub リポジトリを見る
      </a>
    </div>
  );
}
