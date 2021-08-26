import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            as='font'
            href='https://fonts.googleapis.com/css2?family=Gravitas+One&family=Poppins:wght@400;500;600;700;800;900&display=swap'
          />
          <script
            src='https://unpkg.com/dayjs@1.8.21/dayjs.min.js'
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
