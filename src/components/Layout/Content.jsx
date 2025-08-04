const Content = () => {
  return (
    <>
      <main className="p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <slot></slot>
          </div>
        </div>
      </main>
    </>
  );
};

export default Content;
