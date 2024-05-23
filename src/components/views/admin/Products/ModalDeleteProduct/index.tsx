import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteProduct.module.scss";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";

type PropsTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropsTypes) => {
  const { deletedProduct, setDeletedProduct, setProductData, setToaster } =
    props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(session)

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setToaster({
              variant: "success",
              message: "Success Delete Product",
            });
            setDeletedProduct({});
            const { data } = await productServices.getAllProducts();
            setProductData(data.data);
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "failed",
        message: "Failed Delete Product",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.modal__title}>Are You Sure?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
