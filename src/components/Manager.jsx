import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("copied to clipboard " + text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/crosseye.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/crosseye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log(...passwordArray, form);
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };
  const DeletePassword = (id) => {
    console.log("Deleting Password with id", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing Password with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-2 md:p-0 mycontainer min-h-[89.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"></span>&lt; Pass
          <span className="text-green-500">Op</span>/&gt;
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-0 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={35}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-1">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            className=" copy cursor-pointer p-0.5 w-5"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src=" /icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <img
                            className=" copy cursor-pointer p-0.5 w-5"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src=" /icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <img
                            className=" copy cursor-pointer p-0.5 w-5"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src=" /icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          <span>
                            <img
                              className=" cursor-pointer p-0.5 w-5"
                              onClick={() => editPassword(item.id)}
                              src="/icons/edit.png"
                              alt="edit"
                            />
                          </span>
                          <span>
                            <img
                              className=" cursor-pointer p-0.5 w-5"
                              onClick={() => DeletePassword(item.id)}
                              src="/icons/delete.png"
                              alt="delete"
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
