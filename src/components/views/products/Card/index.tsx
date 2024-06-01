import Image from "next/image";
import styles from "./Card.module.scss";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";

type PropsTypes = {
  product: Product;
};

const Card = (props: PropsTypes) => {
  const { product } = props;
  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt="product"
        width={500}
        height={500}
        className={styles.card__image}
      />
      <h4 className={styles.card__title}>{product.name}</h4>
      <p className={styles.card__category}>{product.category}</p>
      <p className={styles.card__price}>{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
