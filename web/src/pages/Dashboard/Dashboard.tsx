import { MagnifyingGlass, PencilSimple, Plus } from "@phosphor-icons/react";
import { BannerMeteorological } from "../../components/BannerMeteorological";
import { Input } from "../../components/input";
import { Pagination } from "../../components/pagination";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { EditeModalForm } from "./components/EditeModalForm";
import { Modal } from "../../components/Modal";
import { CreateFormModal } from "./components/CreateFormModal";
import axios from "axios";
import { format } from "date-fns";

interface Note {
  colorHex: string;
  description: string;
  title: string;
  createdAt: string;
  _id: string;
}

export function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { open } = useContext(ModalContext);

  const openModalNewNote = () => open("createNote");
  const openModalEditeNote = () => open("editeModal");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await axios.get("http://localhost:3000/post?page=1", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(response.data.body);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        }
      }
    };

    getNotes();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-2">
      <BannerMeteorological />

      <div className="container flex justify-between items-center m-auto">
        <div className="flex gap-2">
          <MagnifyingGlass size={24} weight="bold" />
          <Input placeholder="Procurar..." />
        </div>

        <div>
          <button
            className="bg-black text-white p-3 rounded-full"
            type="button"
            onClick={openModalNewNote}
          >
            <Plus size={24} weight="bold" />
          </button>
        </div>
      </div>

      <div className="container m-auto">
        <div className="grid grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              style={{ backgroundColor: note.colorHex }}
              className="min-w-72 p-6 rounded-lg flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">{note.title}</h2>
                <p className="tracking-wider">{note.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <time>
                  {format(new Date(note.createdAt), "dd 'de' MMMM yyyy")}
                </time>

                <button
                  className="rounded-full bg-black p-2"
                  type="button"
                  onClick={openModalEditeNote}
                >
                  <PencilSimple
                    size={24}
                    weight="fill"
                    className="text-white"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-auto">
        <Pagination />
      </div>

      <Modal id="createNote">
        <CreateFormModal />
      </Modal>

      <Modal id="editeModal">
        <EditeModalForm />
      </Modal>
    </div>
  );
}
