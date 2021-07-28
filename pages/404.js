import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/404.module.css";
export default function errorPage() {
  return (
    <Layout>
      <Link href='/'>Go home</Link>
      <div className={styles.error}>
        Nah bra go back
        <FaExclamationTriangle />
      </div>
    </Layout>
  );
}
