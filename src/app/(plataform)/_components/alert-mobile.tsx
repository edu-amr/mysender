"use client";

import { Scaling } from "lucide-react";
import { useMedia } from "@/hooks/use-media";

export function AlertMobile() {
  const isMobile = useMedia(1024);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full relative flex items-center justify-center flex-col">
        <Scaling size={36} className="mb-4 text-green-2" />
        <h2 className="text-lg font-bold text-center">Plataforma indisponível para dispositivos móveis</h2>
        <p className="text-gray-600 mt-2 text-center">
          Essa plataforma não foi projetada para funcionar em dispositivos móveis. 
          Para acessá-la, utilize um computador desktop ou notebook.
        </p>
        <p className="text-gray-600 mt-2 text-center">
          Agradecemos a sua compreensão e pedimos desculpas por qualquer inconveniente causado.
        </p>
      </div>
    </div>
  );
}
