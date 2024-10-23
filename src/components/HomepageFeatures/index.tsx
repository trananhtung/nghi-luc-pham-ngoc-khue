import styles from "./styles.module.css";

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.containerImage}>
          <img src="/img/bia.png" alt="Nghị Lực" />
        </div>
      </div>
    </section>
  );
}
