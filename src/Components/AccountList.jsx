import { useState } from "react";
import AccountFilter from "./AccountFilter";

const AccountList = ({ accounts, setAccount }) => {
  const [accountFilter, setAccountFilter] = useState("All");
  const [showModal, setShowModal] = useState({
    state: "hidden",
    message: null,
    color: "",
    textAlign: "text-center",
  });

  const deleteHandler = (id) => {
    const account = accounts.filter((acc) => acc.id === id);
    if (account[0].sum > 0) {
      setShowModal({
        state: "visible",
        message: "Neištrinsi kol yra pinigėėėėlių",
        textAlign: "text-center",
      });
      setTimeout(() => {
        setShowModal({
          state: "hidden",
          message: "",
          textAlign: "text-center",
        });
      }, 2000);
    } else {
      setAccount((prevState) => prevState.filter((acc) => acc.id !== id));
      setShowModal({
        state: "visible",
        message: "Paskyra ištrinta",
        textAlign: "text-center",
      });
      setTimeout(() => {
        setShowModal({
          state: "hidden",
          message: "",
          textAlign: "text-center",
        });
      }, 2000);
    }
  };

  const sumHandler = (e) => {
    let enteredSum = e.target.value;

    if (+enteredSum >= 0 || !e.target.value) {
      let updatedMoney = accounts.map((acc) =>
        acc.id === +e.target.id ? { ...acc, enteredAmount: enteredSum } : acc
      );
      setAccount(updatedMoney);
    }
  };

  const depositHandler = (id) => {
    let updatedMoney = accounts.map((acc) =>
      acc.id === id
        ? {
            ...acc,
            sum: +(acc.sum + +acc.enteredAmount).toFixed(2),
            enteredAmount: "",
          }
        : acc
    );
    setAccount(updatedMoney);
  };

  const withdrawHandler = (id) => {
    const account = accounts.filter((acc) => acc.id === id);

    if (+account[0].enteredAmount <= account[0].sum) {
      let updatedMoney = accounts.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              sum: +(acc.sum - +acc.enteredAmount).toFixed(2),
              enteredAmount: "",
            }
          : acc
      );
      setAccount(updatedMoney);
    } else {
      setShowModal({
        state: "visible",
        message: "Tu gal matiekos nemoki?",
        color: "bg-orange-500",
        textAlign: "text-center",
      });
      setTimeout(() => {
        setShowModal({
          state: "hidden",
          message: "",
          color: "",
          textAlign: "text-center",
        });
      }, 2000);
    }
  };

  const filterHandler = (e) => {
    setAccountFilter(e.target.value);
  };

  const filteredAccounts = accounts.filter((acc) =>
    accountFilter === "withMoney"
      ? acc.sum > 0
      : accountFilter === "noMoney"
      ? acc.sum === 0
      : true
  );

  const empty = <p className="box">Nėra jokiu paskyrų</p>;

  return (
    <>
      <AccountFilter filterHandler={filterHandler} />
      <div
        className={`${showModal.state} ${showModal.color}`}
      >
        <p className='modal-message'>{showModal.message}</p>
      </div>
      <div>
        {filteredAccounts.length > 0
          ? filteredAccounts
              .sort((a, b) => a.lastName.localeCompare(b.lastName))
              .map((acc) => (
                <div key={acc.id} className="user">
                  <p className="name">
                    {acc.name} {acc.lastName}
                  </p>
                  <p className="balance">${acc.sum}</p>
                  <div className="actions">
                    <button
                      className="button"
                      onClick={() => deleteHandler(acc.id)}
                    >
                      X
                    </button>
                    <div className="flex flex-row items-center space-x-4">
                      <input
                        type="number"
                        id={acc.id}
                        onChange={sumHandler}
                        value={acc.enteredAmount}
                        className="border border-gray-400 rounded py-2 px-4 w-24"
                        min={0}
                        step="0.01"
                      />
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded deposit-button"
                        onClick={() => depositHandler(acc.id)}
                      >
                        Pridėti Lėšas
                      </button>
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded withdraw-button"
                        onClick={() => withdrawHandler(acc.id)}
                      >
                        Atimti Pinigėlius
                      </button>
                    </div>
                  </div>
                </div>
              ))
          : empty}
      </div>
    </>
  );
};

export default AccountList;
