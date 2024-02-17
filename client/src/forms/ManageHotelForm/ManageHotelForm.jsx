import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import TypeSection from "./TypeSection.jsx";
import HotelDetailsSection from "./HotelDetailsSection.jsx";
import FacilitiesSection from "./FacilitiesSection.jsx";
import GuestSection from "./GuestSection.jsx";
import ImagesSection from "./ImagesSection.jsx";
const ManageHotelForm = ({onSave,isLoading}) => {
  const formMethods = useForm();
  const {handleSubmit}=formMethods;
  const onSubmit=handleSubmit((formDataJson)=>{
    console.log(formDataJson)
    const formData=new FormData();
    formData.append("name",formDataJson.name)
    formData.append("city",formDataJson.city)
    formData.append("country",formDataJson.country)
    formData.append("description",formDataJson.description)
    formData.append("pricePerNight",formDataJson.pricePerNight.toString())
    formData.append("type",formDataJson.type)
    formData.append("starRating",formDataJson.starRating.toString())
    formData.append("adultCount",formDataJson.adultCount.toString())
    formData.append("childCount",formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility,index)=>{
      formData.append(`facilities[${index}]`,facility)
    })

    Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
      formData.append('imageFiles',imageFile);
    })
    onSave(formData)

  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving...":"Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
