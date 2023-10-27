import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const TopMenu: React.FC = () => {
  const start = <Button label="New" icon="pi pi-plus" />;
  const end = <Button label="Logout" icon="pi pi-power-off" />;
  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
};

export default TopMenu;
