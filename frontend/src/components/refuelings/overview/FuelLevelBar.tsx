

interface FuelLevelProps {
    level: number; //0-100%
  }

const FuelLevelBar = (props: FuelLevelProps) => {


    // License: MIT - https://opensource.org/licenses/MIT
    // Author: Michele Locati <michele@locati.it>
    // Source: https://gist.github.com/mlocati/7210513
    const perc2color = (perc: number) :string => {
        let r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        const h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    return (
    <>
        <div className="w-full bg-neutral-200 dark:bg-neutral-600">
          <div
          className={`p-1 text-center text-xs font-medium leading-none text-black `}
          style={{ width: `${props.level}%`, backgroundColor: `${perc2color(props.level)}` }}
          >
          <p>{props.level}%</p>
          </div>
      </div>
    </>
    );
  };
  
  export default FuelLevelBar;