import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  plugins: [[ require.resolve('docusaurus-lunr-search'), {
    languages: ['vi'] // language codes
  }]],
  title: 'Nghị Lực - Phạm Ngọc Khuê',
  tagline: 'NGHỊ LỰC CỦA P. N. KHUÊ, IN XONG TẠI NHÀ IN HÀN-THUYẾN, NGÀY 30-4-42 NGOÀI NHỮNG BẢN THƯỜNG, CÓ IN THÊM 5 BẢN ĐẶC BIỆT GIẤY NHIỄU SÓNG THAO, ĐÁNH DẤU TỪ K, I ĐẾN K. V, CÓ CHỮ KÝ CỦA TÁC GIẢ. NHỮNG BẢN NÀY ĐỀU KHÔNG ĐỂ BÁN.',
  favicon: 'img/book-256.png',

  // Set the production url of your site here
  url: 'https://nghiluc.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/trananhtung/nghi-luc-pham-ngoc-khue/blob/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/bia.png',
    metadata: [
      { name: 'google-site-verification', content: 'dFKPZfeOjCEmMn81BIQ4_yXQW-kRJ0Wc6ij6wPl_Raw' },
    ],
    navbar: {
      title: 'Giới thiệu',
      logo: {
        alt: 'Nghi lực - Phạm Ngọc Khuê',
        src: 'img/book-256.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Nội dung',
        },
        {
          href: 'https://nghiluc.vercel.app/books/Nghị_Lực_NXB_Hàn_Thuyên_1942_Phạm_Ngọc_Khuê_212_Trang.pdf',
          label: 'Tải bản gốc',
          position: 'left'
        },
        {
          href: 'https://github.com/trananhtung/nghi-luc-pham-ngoc-khue',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Danh mục',
          items: [
            {
              label: 'Trang chủ',
              to: '/',
            },
            {
              label: 'Nội Dung',
              to: '/docs/muc-luc',
            },
            {
              label: 'Bản gốc',
              to: 'https://nghiluc.vercel.app/books/Nghị_Lực_NXB_Hàn_Thuyên_1942_Phạm_Ngọc_Khuê_212_Trang.pdf',
            }
          ],
        },
        {
          title: 'Liên hệ',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/trananhtung/nghi-luc-pham-ngoc-khue',
            },
            {
              label: 'Tác giả',
              href: 'http://vannghequandoi.com.vn/binh-luan-van-nghe/nha-van-bac-si-pham-ngoc-khue-buoc-chan-nguoi-linh-tay-tien-nam-xua_12917.html',
            }
          ],
        },
      ],
      copyright: `2024 @TAT team`,
    },
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
