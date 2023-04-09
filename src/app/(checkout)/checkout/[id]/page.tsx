"use client";
import { getComic } from "@/services/marvelApi";
import { Comic } from "@/types/comic";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { useRouter } from "next/navigation";

const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("name is required")
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(" ")
    ),
  lastName: z
    .string()
    .nonempty("name is required")
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(" ")
    ),
  email: z
    .string()
    .email("invalid email format")
    .nonempty("email is required")
    .toLowerCase()
    .refine((email) => email.endsWith("@test.com"), "email must end with '@test.com'"),
  cardNumber: z.number().nonnegative().min(12, "password must have at least 6 characters").max(16),
  cardExpirationDate: z.string().min(5).max(5),
  cardCvc: z.number().nonnegative().min(3).max(3),
  nameOnCard: z.string().nonempty("name displayed on the card is required"),
  addressStreet: z.string().nonempty(),
  addressNumber: z.number().nonnegative().optional(),
  city: z.string().nonempty(),
  state: z.string().nonempty(),
  zipCode: z.number().min(4).max(16).nonnegative(),
});

type checkoutFormData = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage({ params }: { params: { id: number } }) {
  const comic: Comic = use(getComic(params.id));
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<checkoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const submitCheckoutForm: SubmitHandler<checkoutFormData> = async () => {
    const formData = getValues();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    router.push("/checkout/success");
    return res.json();
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
      <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
        <div className="flex flex-col justify-start items-start w-full space-y-4">
          <p className="text-xl md:text-2xl leading-normal text-gray-800 ">{comic.title}</p>
          <p className="text-base font-semibold leading-none text-gray-600">${comic.price}.00</p>
        </div>
        <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
          <Image src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} width={450} height={575} alt={comic.title} />
        </div>
      </div>

      <div className="p-8 bg-gray-100  flex flex-col lg:w-full xl:w-3/5">
        <form onSubmit={() => handleSubmit(submitCheckoutForm)}>
          <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
            <div>
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                  fill="currentColor"
                />
                <path
                  d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-base leading-4">Pay</p>
            </div>
          </button>

          <div className="flex flex-row justify-center items-center mt-6">
            <hr className="border w-full" />
            <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or pay with card</p>
            <hr className="border w-full" />
          </div>

          <div className="mt-8">
            <div className="flex-row flex">
              {errors.firstName && <span className="text-red-400 text-xs">{errors.firstName.message}</span>}
              <input
                className="border rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.lastName && <span className="text-red-400 text-xs">{errors.lastName.message}</span>}
              <input
                className="border rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
              />
            </div>
            {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
            <input
              className="border border-gray-300 p-4 rounded-b w-full text-base leading-4 placeholder-gray-600 text-gray-600"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <label className="mt-8 text-base leading-4 text-gray-800">Card details</label>
          <div className="mt-2 flex-col">
            <div>
              {errors.cardNumber && <span className="text-red-400 text-xs">{errors.cardNumber.message}</span>}
              <input
                className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="number"
                id="cardNumber"
                placeholder="0000 1234 6549 15151"
                {...register("cardNumber")}
              />
            </div>
            <div className="flex-row flex">
              {errors.cardExpirationDate && <span className="text-red-400 text-xs">{errors.cardExpirationDate.message}</span>}
              <input
                className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="cardExpirationDate"
                placeholder="MM/YY"
                {...register("cardExpirationDate")}
              />
              {errors.cardCvc && <span className="text-red-400 text-xs">{errors.cardCvc.message}</span>}
              <input
                className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="number"
                id="cardCvc"
                placeholder="CVC"
                {...register("cardCvc")}
              />
            </div>
          </div>

          <label className="mt-8 text-base leading-4 text-gray-800 ">Name on card</label>
          <div className="mt-2 flex-col">
            <div>
              {errors.nameOnCard && <span className="text-red-400 text-xs">{errors.nameOnCard.message}</span>}
              <input
                className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="nameOnCard"
                placeholder="Matt Murdock"
                {...register("nameOnCard")}
              />
            </div>
          </div>

          <label className="mt-8 text-base leading-4 text-gray-800 ">Address</label>
          <div className="mt-2 flex">
            {errors.addressStreet && <span className="text-red-400 text-xs">{errors.addressStreet.message}</span>}
            <input
              className="border rounded-t border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
              type="text"
              id="addressStreet"
              placeholder="Street"
              {...register("addressStreet")}
            />
            {errors.addressNumber && <span className="text-red-400 text-xs">{errors.addressNumber.message}</span>}
            <input
              className="border rounded-b border-gray-300 p-4 w-1/4 text-base leading-4 placeholder-gray-600 text-gray-600"
              type="text"
              id="addressNumber"
              placeholder="Nº"
              {...register("addressNumber")}
            />
          </div>
          <label className="mt-8 text-base leading-4 text-gray-800 ">Country or region</label>
          <div className="mt-2 flex-col">
            <div className="flex-row flex">
              {errors.city && <span className="text-red-400 text-xs">{errors.city.message}</span>}
              <input
                className="border rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="city"
                placeholder="City"
                {...register("city")}
              />
              {errors.state && <span className="text-red-400 text-xs">{errors.state.message}</span>}
              <input
                className="border rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                id="state"
                placeholder="State/Province"
                {...register("state")}
              />
            </div>
            <div>
              {errors.zipCode && <span className="text-red-400 text-xs">{errors.zipCode.message}</span>}
              <input
                className="border rounded-b border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="number"
                id="zipCode"
                placeholder="ZIP"
                {...register("zipCode")}
              />
            </div>
          </div>

          <button
            className="mt-8 border border-transparent hover:border-gray-300  bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
            type="submit"
          >
            <div>
              <p className="text-base leading-4">Pay ${comic.price}.00</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
