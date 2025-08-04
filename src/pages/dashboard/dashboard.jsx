const dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-green-600">
        Selamat datang, {user?.name}!
      </div>
    </>
  );
};

export default dashboard;
