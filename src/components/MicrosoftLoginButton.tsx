const MicrosoftLoginButton = ({ onClick }: { onClick: any }) => {
  return (
    <button
      onClick={onClick}
      className="flex px-3 items-center h-[41px] border border-[#8C8C8C] text-[#5E5E5E] font-semibold hover:bg-neutral-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="main-grid-item-icon" fill="none">
        <path d="M13.09 13.091H24v10.91H13.09z" fill="#FEBA09" />
        <path d="M0 13.091h10.91v10.91H0z" fill="#06A6F0" />
        <path d="M13.09 0H24v10.91H13.09z" fill="#80BC07" />
        <path d="M0 0h10.91v10.91H0z" fill="#F25326" />
      </svg>

      <span className="ml-3">Kirjaudu Microsoft-tilillä</span>
    </button>
  );
};

export default MicrosoftLoginButton;
