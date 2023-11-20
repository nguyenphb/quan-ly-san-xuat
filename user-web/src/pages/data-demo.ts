import { createEmptyArray } from '@/utils/array';
import { getRandomInt } from '@/utils/common';
import { nanoid } from '@ant-design/pro-components';
export type DataTable = {
  id: string;
  label?: string;
  totalTarget: number;
  hourlyTarget: number;
  actual: number;
};
const max = 9;
const getData = ({ label }: { label: string }): DataTable => {
  const hourlyTarget = getRandomInt(100, 200);
  const actual = getRandomInt(100, 200);
  return {
    id: nanoid(),
    label: label,
    totalTarget: getRandomInt(1000, 2000),
    hourlyTarget: hourlyTarget,
    actual: actual,
  };
};
export const dataDemoProduct = [
  {
    zone: 'Semi-finished Goods',
    data: [
      {
        productName: 'Gum',
        data: [
          getData({ label: 'Coating Gum' }),
          getData({ label: 'Lamination' }),
          getData({ label: 'Executive 1' }),
          getData({ label: 'Executive 2' }),
          getData({ label: 'Exorcisms BB' }),
          getData({ label: 'Bosch Splosh' }),
          getData({ label: 'Schib Mono 9' }),
          getData({ label: 'Line Chock' }),
          getData({ label: 'Schib (MFA)' }),
        ],
      },
      {
        productName: 'Chupa-Melody',
        data: [
          getData({ label: 'Chupa Line #1' }),
          getData({ label: 'Chupa Line #2' }),
          getData({ label: 'Dip&Lick' }),
          getData({ label: 'Barcoding 1 & 2' }),
          getData({ label: 'Forming' }),
          getData({ label: 'BZW 1' }),
          getData({ label: 'BZW 2' }),
          getData({ label: 'Flowpack' }),
        ],
      },
      {
        productName: 'Mentos',
        data: [
          getData({ label: 'D-line' }),
          getData({ label: 'H-line' }),
          getData({ label: 'Coating 2' }),
          getData({ label: '3pcs/4pcs' }),
        ],
      },
      {
        productName: 'Candy',
        data: [
          getData({ label: 'Mixer' }),
          getData({ label: '2Chew Mono' }),
          getData({ label: 'Lollipop' }),
        ],
      },
      {
        productName: 'Jelly',
        data: [
          getData({ label: 'IMAR' }),
          getData({ label: 'Multipond #1' }),
          getData({ label: 'Multipond #2' }),
        ],
      },
    ],
  },
  {
    zone: 'Finished Goods',
    data: [
      {
        productName: 'Mentos',
        data: [
          getData({ label: 'AWS 2000' }),
          getData({ label: 'AWS 4000' }),
          getData({ label: 'Mentos Pouching 1' }),
          getData({ label: 'Mentos Pouching 2' }),

          getData({ label: 'Outer Mini' }),
          getData({ label: 'Cup' }),
          getData({ label: 'Puching 3' }),
        ],
      },
      {
        productName: 'Gum',
        data: [
          getData({ label: '3D' }),
          getData({ label: 'Bosch Bipack 1 & 2' }),
          getData({ label: 'Auto Bottle line 1' }),
          getData({ label: 'Auto Bottle line 2' }),

          getData({ label: 'Blister 1' }),
          getData({ label: 'Blister 2' }),
          getData({ label: 'Blister 3' }),

          getData({ label: 'Pellet Stick' }),
          getData({ label: 'Roll Stick' }),
        ],
      },
      {
        productName: 'Candy',
        data: [
          getData({ label: '2 Chew Stick' }),
          getData({ label: 'Incredible Chew' }),
          getData({ label: 'Pouching 1' }),
          getData({ label: 'Pouching 4' }),
          getData({ label: 'Golia Stick' }),
          getData({ label: 'Alpenliebe Stick' }),
          getData({ label: '3-pack' }),
        ],
      },
      {
        productName: 'Chupa-Melody',
        data: [
          getData({ label: 'Pouching 1' }),
          getData({ label: 'Pouching 2' }),
          getData({ label: 'Chupa Flowoack' }),
        ],
      },
      {
        productName: 'Jelly',
        data: [
          getData({ label: 'IMAR' }),
          getData({ label: 'Multipond #1' }),
          getData({ label: 'Multipond #2' }),
        ],
      },
    ],
  },
];

// .map(item=> ({
//   ...item,
//   data: item.data.map(item2=>({
//     ...item2,
//     data: (()=>{
//       const data = [];
//       for (let index = 0; index < max; index++) {
//         const element = item2.data[index];
//         if(element){
//           data.push(element);

//         }else{
//           data
//         }

//       }
//     })()
//   })),
// }));
type DataType = {
  id: string;
  label?: string;
  target: number;
  actual: number;
  diff: number;
};
const getDataBoard = ({ label }: { label: string }): DataType => {
  const target = getRandomInt(100, 200);
  const actual = getRandomInt(100, 200);
  return {
    id: nanoid(),
    label: label,
    target: target,
    actual: actual,
    diff: actual - target,
  };
};
export const dataDemoMentosMonitoringBoard = [
  {
    zone: 'Semi-finished Goods',
    data: [
      getDataBoard({ label: 'H-line' }),
      getDataBoard({ label: 'D-line' }),
      getDataBoard({ label: 'Coating 2' }),
      getDataBoard({ label: '3pcs/4pcs' }),
    ],
  },
  {
    zone: 'Finished Goods',
    data: [
      getDataBoard({ label: 'AWS 2000' }),
      getDataBoard({ label: 'AWS 4000' }),
      getDataBoard({ label: 'Cup' }),
      getDataBoard({ label: 'Outer Mini' }),
      getDataBoard({ label: 'Puching 1' }),
      getDataBoard({ label: 'Puching 2' }),
      getDataBoard({ label: 'Puching 3' }),
    ],
  },
];
