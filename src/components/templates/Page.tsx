import ResetPassForm from "../modules/ResetPassForm";

export default function Page() {
  return (
    <div className="w-ful md:w-6/12 lg:w-6/12 xl:w-4/12 mx-auto px-2">
      <h1 className="text-center mb-5 font-bold text-blue-600">
        RESET PASSWORD
      </h1>
      <ResetPassForm />
    </div>
  );
}
