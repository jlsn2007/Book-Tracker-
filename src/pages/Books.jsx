import { Link, useNavigate, useParams } from "react-router-dom";
import Titulo from "../components/Titulo";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { optionSelect } from '../utils/apiURL';
import useDataBook from "../hooks/books/useDataBook";
import { useForm } from "react-hook-form";

const Books = () => {

  const { id } = useParams();
  const methods = useForm();
  const {register, handleSubmit, errors} = useDataBook(methods);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-blue-100 p-2 rounded w-auto text-center hover:bg-blue-200 transition-colors"
      >
        Regresar al Dashboard
      </Link>

      <form
        onSubmit={handleSubmit}
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4">
        <Titulo titulo="Información del libro"/>

        <p className="mt-1 text-sm/6 text-gray-600">
          Ingresa la información del libro que deseas agregar o actualizar.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <InputText
            type="text"
            name="Autor"
            label="Autor"
            placeholder="Leví Saravia"
            register={register}
            errors={errors}
          />
          <InputText
            type="text"
            name="Libro"
            label="Título"
            placeholder="El Gol de la Vida"
            register={register}
            errors={errors}
          />

          <InputText
            type="text"
            name="Genero"
            label="Género"
            placeholder="La mágia del futbol"
            register={register}
            errors={errors}
          />

          <SelectInput
            label="Estado"
            options={optionSelect}
            name="Estado"
            register={register}
            errors={errors}
          />

        </div>

        <Button type="submit" text="Save Book" />
      </form>
    </div>
  );
};

export default Books;
