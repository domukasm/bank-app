const AccountSummary = ({ accounts }) => {
    const totalMoney = accounts.reduce(
        (total, current) => total + current.sum,
        0
    );

    return (
        <div>
            <h1 className="header">
                Bitutės bankas
            </h1>
            <div className="info">
                    Iš viso paskyrų:
                    <span>
                        {accounts.length}
                    </span>
                    Iš viso pinigų:
                    <span>
                        ${totalMoney.toFixed(2)}
                    </span>
            </div>
            </div>
    );
};
export default AccountSummary;
