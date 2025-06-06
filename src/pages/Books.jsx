import { Link, useNavigate, useParams } from "react-router-dom";
import Titulo from "../components/Titulo";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { url } from "../utils/apiURL";

const estados = [
  { label: "Leído", value: "leido" },
  { label: "Pendiente", value: "pendiente" },
  { label: "Leyendo", value: "leyendo" },
];

const Books = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      Autor: "",
      Libro: "",
      Estado: "",
      Genero: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
  if (id && id !== "new") {
    fetch(`${url}/${id}`)
      .then((res) => res.json())
      .then((data) => reset(data))
      .catch(() => toast.error("Error cargando libro"));
  }
}, [id, reset]);


  const onSubmit = async (data) => {
    try {
        
      const isEdit = id && id !== "new";
      const method = isEdit ? "PUT" : "POST";
      const endpoint = isEdit ? `${url}/${id}` : url;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error guardando libro");
      toast.success("Libro guardado con éxito");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error guardando libro");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-blue-100 p-2 rounded w-auto text-center hover:bg-blue-200 transition-colors"
      >
        Regresar al Dashboard
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4"
      >
        <Titulo titulo={id ? "Editar Libro" : "Agregar Libro"} />

        <p className="mt-1 text-sm/6 text-gray-600">
          Ingresa la información del libro que deseas agregar o actualizar.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputText
            type="text"
            name="Autor"
            label="Autor"
            placeholder="Gabriel García Márquez"
            register={register}
            errors={errors}
          />
          <InputText
            type="text"
            name="Libro"
            label="Título"
            placeholder="Cien años de soledad"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Estado"
            options={estados}
            name="Estado"
            register={register}
            errors={errors}
          />
          <InputText
            type="text"
            name="Genero"
            label="Género"
            placeholder="Realismo mágico"
            register={register}
            errors={errors}
          />
        </div>

        <Button type="submit" text={id ? "Actualizar Libro" : "Agregar Libro"} />
      </form>
    </div>
  );
};

export default Books;
