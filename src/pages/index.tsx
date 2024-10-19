import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/muc-luc">
            Đọc sách
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="NGHỊ LỰC CỦA P. N. KHUÊ, IN XONG TẠI NHÀ IN HÀN-THUYẾN, NGÀY 30-4-42 NGOÀI NHỮNG BẢN THƯỜNG, CÓ IN THÊM 5 BẢN ĐẶC BIỆT GIẤY NHIỄU SÓNG THAO, ĐÁNH DẤU TỪ K, I ĐẾN K. V, CÓ CHỮ KÝ CỦA TÁC GIẢ. NHỮNG BẢN NÀY ĐỀU KHÔNG ĐỂ BÁN.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
