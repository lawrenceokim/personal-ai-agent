import React from "react";

function Workspace() {
  return (
    <div>
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          {/* Assistant List */}Assistant List
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          {/* Chat UI */}Chat UI
        </div>
        <div className="hidden lg:block">{/* Settings */}Settings</div>
      </div>
    </div>
  );
}

export default Workspace;
