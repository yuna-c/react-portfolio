import './Illust.scss';

export default function Illust() {
	return (
		<div className='Illust myScroll'>
			<div className='svgBox'>
				{/* vieBox(가로위치값, 세로위치값, 가로폭의 비율, 세로폭의 비율) 0 0 512 512*/}
				<svg viewBox='-1 -1 514 514'>
					<path d='M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z' />
				</svg>
			</div>
		</div>
	);
}

/*
const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop);
// General scroll to element function

const App = () => {
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const executeScrollDown = () => scrollToRef(myRef2);
  return (
    <>
      <div style={{ height: 300, overflow: "auto" }}>
        <button onClick={executeScrollDown}> Click to down </button>
        <div style={{ height: 100 }} ref={myRef}>
          I wanna be seen
        </div>
        <button onClick={executeScroll} ref={myRef2}>
          Click to scroll{" "}
        </button>
      </div>
    </>
  );
};

export default App;

*/
