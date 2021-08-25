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
          <title>SnoWhen</title>
          <meta charset='UTF-8' />
          <meta name='description' content='Free Web tutorials' />
          <meta name='keywords' content='HTML, CSS, JavaScript' />
          <meta name='author' content='John Doe' />

          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
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
