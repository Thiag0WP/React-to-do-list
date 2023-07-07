import * as yup from 'yup';
import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const validationSchema = yup.object().shape({
    title: yup.string().required("O titulo é obrigatório"),
    category: yup.string().required("A categoria é obrigatória"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ title, category }, {abortEarly: false});
      addTodo(title, category);
      setTitle("");
      setCategory("");
    } catch (error) {
      console.log(error.errors);
    }

    // if (!title || !category) {
    //   alert("Categoria não selecionada, por favor selecione uma! :)");
    //   return;
    // }      //esse if era para verificar se a categoria estava selecionada antes de eu substituir pelo yup.
    // addTodo(title, category);
    // setTitle("");
    // setCategory("");
  };


  return (
    <div>
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          placeholder="Selecione uma categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* <span>Selecione uma categoria</span> */}
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
        </select>
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
