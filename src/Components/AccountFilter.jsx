const AccountFilter = ({ filterHandler }) => {
    return (
        <div className='box'>
            <label
                htmlFor='account-select'
            >
                Paskyros:
            </label>
            <select
                name='account'
                onChange={filterHandler}
            >
                <option value='All'>Visi</option>
                <option value='withMoney'>Bajoras Turtingas</option>
                <option value='noMoney'>Benamis Vargsas</option>
            </select>
        </div>
    );
};

export default AccountFilter;
