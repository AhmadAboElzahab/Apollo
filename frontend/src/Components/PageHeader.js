export default function PageHeader(props) {
  return (
    <div className='bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20 w-50 '>
      <div className='rounded-lg bg-black p-3'>
        <span className=' text-sm animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-100'>
          {props.title}
        </span>
      </div>
    </div>
  );
}
