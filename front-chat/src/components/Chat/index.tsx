"use client";

import socket from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Chat = () => {
  const [mensagens, setMensagens] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const fimDasMensagensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("mensagem", (msg: string) => {
      setMensagens((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("mensagem");
    };
  }, []);

  useEffect(() => {
    fimDasMensagensRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (mensagem === "") return;
    socket.emit("mensagem", mensagem);
    setMensagem("");
  };

  return (
    <section className="border-2 border-black rounded-lg">
      <ul className="my-4 space-y-2 min-h-60 max-h-60 overflow-y-auto">
        {mensagens.map((msg, index) => (
          <li
            key={index}
            className="text-sm w-fit mx-2 bg-gray-100 rounded px-3 py-1"
          >
            {msg}
          </li>
        ))}
        <div ref={fimDasMensagensRef} />
      </ul>
      <form onSubmit={enviarMensagem} className="flex border-t-2 border-black">
        <Input
          type="text"
          onChange={(e) => setMensagem(e.target.value)}
          value={mensagem}
          placeholder="Digite sua mensagem..."
        />
        <Button type="submit" className="rounded-e-none">
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default Chat;
