import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <script src="/static/rem.js" />
          <script src="/static/user-agent.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        {process.env.NODE_ENV && <script src="https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js" />}
        {process.env.NODE_ENV && <script>var vConsole = new VConsole();</script>}
      </html>
    );
  }
}
