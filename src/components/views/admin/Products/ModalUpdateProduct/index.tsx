import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";

type PropTypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { updatedProduct, setUpdatedProduct, setToaster, setProductsData } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const stock = stockCount.map((stock: { size: string; qty: number }) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setToaster({
              variant: "danger",
              message: "Failed Add Product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="name"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
          className={styles.form__input}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert product prices"
          defaultValue={updatedProduct.price}
          className={styles.form__input}
        />

        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Insert product description"
          defaultValue={updatedProduct.description}
          className={styles.form__input}
        />

        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct.category}
          className={styles.form__input}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
          className={styles.form__input}
        />
        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            className={styles.form__image__preview}
          />

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <label htmlFor="stock"></label>
        {stockCount.map(
          (item: { size: string; qty: number }, index: number) => (
            <div className={styles.form__stock} key={index}>
              <div className={styles.form__stock__item}>
                <Input
                  label="Size"
                  name="size"
                  type="text"
                  placeholder="Insert product size"
                  onChange={(event) => {
                    handleStock(event, index, "size");
                  }}
                  defaultValue={item.size}
                />
              </div>
              <div className={styles.form__stock__item}>
                <Input
                  label="Qty"
                  name="qty"
                  type="number"
                  placeholder="Insert product quantity"
                  onChange={(event) => {
                    handleStock(event, index, "qty");
                  }}
                  defaultValue={item.qty}
                  className={styles.form__input}
                />
              </div>
            </div>
          )
        )}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
