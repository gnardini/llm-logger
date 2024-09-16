
// Default <head> (can be overridden by pages)

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* TODO: Description */}
      <meta name="description" content="" />
      <link rel="icon" href={'/logo.png'} />
      {/* TODO: Analytics script */}
      {/* <script defer data-domain="phinxer.com" src="https://phinxer.com/script.js"></script> */}
    </>
  );
}
