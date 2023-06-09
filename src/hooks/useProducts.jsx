import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";

const useProducts = (arrayId) => {
  const [products, setProducts] = useState(null);

  const getProduct = async (arrayId) => {
    try {
      const fetchedProducts = [];
      for (let i = 0; i < arrayId.length; i++) {
        const docRef = doc(db, "product", arrayId[i]);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
        } else {
          fetchedProducts.push({ ...docSnap.data(), id: docSnap.id });
        }
      }

      setProducts(fetchedProducts);
    } catch (err) {
      console.log("useProduct error: ", err);
    }
  };

  useEffect(() => {
    if (arrayId) {
      getProduct(arrayId);
    }
  }, [arrayId]);

  return products;
};

export default useProducts;
