// Default <head> (can be overridden by pages)

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="LLM Logger logs all your calls to AI and helps to analyze and understand how your product is being used by actual users"
      />
      <link rel="icon" href={'/logo.png'} />
      <script defer data-domain="llmlogger.com" src="https://phinxer.com/script.js"></script>
    </>
  );
}
