import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { BarLoader, BeatLoader } from "react-spinners";

const List = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteUser = (id: any) => {
    var requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:3000/user/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Delete : ", result);
        if (result.message) {
          getData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="h-auto min-h-screen">
      <MdAdd
        className="absolute bottom-0 right-0 bg-white w-[4rem] h-[4rem] rounded-full cursor-pointer p-3 m-6 hover:bg-black"
        onClick={() => {
          navigate(`/detail/${Number(0)}/creat`);
        }}
        color={"green"}
      />
      {data ? (
        data.length > 0 ? (
          <div className="grid md:grid-cols-2 l:grid-cols-4">
            {data.map((item: any, index: number) => {
              let _date = new Date(item.created).toDateString();
              return (
                <div
                  className={`bg-white hover:bg-black flex justify-between text-black hover:text-white
                  border rounded-lg p-3 transition ease-in-out shadow-lg shadow-radius ${
                    index % 2 == 0 && `ml-3`
                  } mb-3 ${index % 1 == 0 && `mr-3`}`}>
                  <Link to={`/detail/${item._id}/view`} key={item._id}>
                    <div>
                      <h2 className="font-semibold text-[2rem]">{item.name}</h2>
                      <h3 className="text-xl">{item.age} years old</h3>
                      <p className="">{_date}</p>
                    </div>
                  </Link>
                  <div className="">
                    <CiEdit
                      className="mb-3 cursor-pointer"
                      size={25}
                      color="blue"
                      onClick={() => navigate(`/detail/${item._id}/edite`)}
                    />
                    <AiOutlineDelete
                      className="cursor-pointer"
                      size={25}
                      color="red"
                      onClick={() => deleteUser(item._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="text-center">No Data</h1>
        )
      ) : (
        <div className="h-screen flex items-center justify-center">
          <BeatLoader
            color={"#fff"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default List;
