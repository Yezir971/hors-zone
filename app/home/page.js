"use client";
import Loading from "@/components/Loading";
import { authContextApi } from "@/context/authContext";
import { supabase } from "@/lib/initSupabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const Home = () => {
  const router = useRouter();
  const { isAuth, user, isLoadingUser  } = authContextApi();
  
  useEffect(() => {
    if(!isLoadingUser  && !user){
      router.push("/login");
    }
  }, [isAuth, isLoadingUser ]);
    
  const sports = [
    {
        name: "Football",
        description: "Un sport d'équipe populaire joué avec un ballon rond. Objectif : marquer dans le but adverse.",
        image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb5953d8-2a29-4b0b-806d-2b1c685bb85a_1280x720.jpeg",
    },
    {
        name: "Basketball",
        description: "Deux équipes s'affrontent pour marquer des paniers en lançant un ballon dans un arceau.",
        image: "https://www.shutterstock.com/image-vector/let-madness-begin-march-tshirt-600nw-2328754759.jpg",
    },
    {
        name: "Tennis",
        description: "Un sport de raquette qui se joue à un ou deux joueurs de chaque côté du filet.",
        image: "https://media.gettyimages.com/id/57423918/fr/photo/young-man-falling-down-on-a-tennis-court.jpg?s=612x612&w=gi&k=20&c=JT6DZIoo2puY1XPU-XKN3WmoEfYzkUWhZY0TCoGYKwU=",
    },
    {
        name: "Natation",
        description: "Un sport individuel ou en relais qui consiste à parcourir une distance en nageant.",
        image: "https://www.aquaponey.fr/header.jpg",
  }
  ];

  if (isLoadingUser && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
          <Loading />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Hors Zone Sports</h1>
          <p className="text-sm mt-1">Découvrez et explorez vos sports préférés</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nos sports à découvrir</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.length == 0 ? (
            <>
              <p className="text-center text-gray-500">Aucun sport pour le moment.</p>
            </>
          ):(
            <>
              {sports.map((sport, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-indigo-700">{sport.name}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{sport.description}</p>
                    <button
                      // onClick={() => onRemove(sport)}
                      className="mt-2.5 sm:mt-0 cursor-pointer bg-blue-600 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl"
                    >
                      j'aime
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home