import { Link, useNavigate, useParams } from "react-router-dom";
import Titulo from "../components/Titulo";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { optionSelect } from '../utils/apiURL';
import useDataBook from "../hooks/books/useDataBook";
import { useForm } from "react-hook-form";
import './styles.css';

const Books = () => {

  const { id } = useParams();
  const methods = useForm();
  const {register, handleSubmit, errors} = useDataBook(methods);

  return (
    <div className="container">
      <Link
        to="/home"
        className="link-button"
      >
        Regresar al Dashboard
      </Link>

      <form
        onSubmit={handleSubmit}
        className="card">
        <Titulo titulo="Información del libro"/>

        <p className="mt-1 text-sm/6 text-gray-600">
          Ingresa la información del libro que deseas agregar o actualizar.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <InputText
            type="text"
            name="autor"
            label="Autor"
            placeholder="Leví Saravia"
            register={register}
            errors={errors}
          />
          <InputText
            type="text"
            name="titulo"
            label="Título"
            placeholder="El Gol de la Vida"
            register={register}
            errors={errors}
          />

          <InputText
            type="text"
            name="genero"
            label="Género"
            placeholder="La mágia del futbol"
            register={register}
            errors={errors}
          />

          <SelectInput
            label="Estado"
            options={optionSelect}
            name="estado"
            register={register}
            errors={errors}
          />

        </div>

        <Button type="submit" text="Agregar" className="btn" />
      </form>
    </div>
  );
};

export default Books;
