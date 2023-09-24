import { API_URL, STRAPI_API_TOKEN } from "@/utils/urls";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartslice";

const checkout = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Initialize useDispatch
  const router = useRouter(); // Initialize the router
  // console.log(cartItem)
  const subtotal = useMemo(() => {
    return cartItem.reduce((total, val) => total + val.attributes.price, 0);
  });
  const [formData, setFormData] = useState({
    // productId: '',
    name: "",
    email: "",
    phone: "",
    postalcode: "",
    address: "",
  });
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log({...formData, [e.target.name]:e.target.value})
  };
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/[0-9]{11}/.test(formData.phone)) {
      newErrors.phone = "Phone is invalid";
    }

    if (!formData.postalcode) {
      newErrors.postalcode = "Postal Code is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      // Form validation failed, do not proceed with the order
      return;
    }
    const orderData = {
      products: cartItem.map((item) => ({
        name: item.attributes.name,
        price: item.attributes.price,
        quantity: item.quantity,
        oneQuantityPrice: item.oneQuantityPrice,
        size: item.selectedSize,

        // Add more product details as needed
      })),

      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postalcode: formData.postalcode,
      address: formData.address,

      totalAmount: subtotal,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/api/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log('Response from Strapi:', response);

      if (response.status === 200) {
        // Order placed successfully
        // Redirect to the success page
        router.push("/success"); // Replace '/success' with the actual path to your success page

        // Clear the form by resetting formData
        setFormData({
          name: "",
          email: "",
          phone: "",
          postalcode: "",
          address: "",
        });
        dispatch(clearCart());
      } else {
        router.push("/failed");
        console.error("Error placing order:", response.statusText);
        // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle errors or show an error message to the user
    }
  };

  // useEffect(() => {
  //   validateForm();
  // }, [formData]);

  // const handleOrder = async () => {
  //   const orderData = {
  //     products: cartItem.map((item) => ({
  //       name: item.attributes.name,
  //       price: item.attributes.price,
  //       quantity: item.quantity,
  //       oneQuantityPrice: item.oneQuantityPrice,
  //       size: item.selectedSize,

  //       // Add more product details as needed
  //     })),

  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone,
  //       postalcode: formData.postalcode,
  //       address: formData.address,

  //     totalAmount: subtotal,
  //   };

  //   try {
  //     const response = await axios.post(`${API_URL}/api/api/api/orders`, orderData, {
  //       headers: {
  //         Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // console.log('Response from Strapi:', response);

  //     if (response.status === 200) {
  //       console.log('Order placed successfully');
  //       // Handle success or show a success message to the user
  //     } else {
  //       console.error('Error placing order:', response.statusText);
  //       // Handle errors or show an error message to the user
  //     }
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     // Handle errors or show an error message to the user
  //   }

  // };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Order Product
            </h1>
            <ul className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {cartItem.map((item) => {
                return <li key={item.id}>{item.attributes.name}</li>;
              })}
            </ul>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    required
                    onChange={handlechange}
                    value={formData.name}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={handlechange}
                    required
                    value={formData.email}
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="Phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    value={formData.phone}
                    onChange={handlechange}
                    id="phone"
                    name="phone"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.phone && (
                    <p className="text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="postalcode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Postal Code
                  </label>
                  <input
                    type="number"
                    value={formData.postalcode}
                    onChange={handlechange}
                    id="postalcode"
                    name="postalcode"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.postalcode && (
                    <p className="text-red-600">{errors.postalcode}</p>
                  )}
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={handlechange}
                    name="address"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-600">{errors.address}</p>
                  )}
                </div>
                <div>{`Total products amount : ${subtotal}`}</div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleOrder}
                  className="rounded-full  w-full py-4 bg-black text-white transition-transform active:scale-95 mb-3 hover:opacity-75"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default checkout;
