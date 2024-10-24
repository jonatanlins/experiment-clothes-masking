import {
  type ImageSegmentationPipelineOutput,
  pipeline,
  RawImage,
} from "@huggingface/transformers";
import { useState } from "react";

const images = [
  "https://cdn.stamped.io/uploads/instagram/197058_17917515875888868_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18067563934603726_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17843093082215566_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18036846964856822_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18308827717147666_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18085457776439690_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18219398236281786_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17931122927748066_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18082718647439336_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17886054723007636_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18026950330901131_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17889934268776106_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17980014221188953_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17957489123400478_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17957367176576689_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18004961365690614_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17865712439887883_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17863233092936133_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18008901433653480_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17951249279466630_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17914546010652909_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17979673223135572_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17909981372741135_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18192781972247734_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17962372265262695_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17856411110899027_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18027137708302404_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17945689067373576_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17963142191080265_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18182250520217406_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17998069459553424_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17975276980835176_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18022447909439865_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18332058196037822_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17985377056654023_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17955095531283504_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17951910377274035_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17880614240754921_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17959141030955901_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17942982668461053_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18259825135105937_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17954415581286653_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17983643953640703_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17904396071659955_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18214985287160294_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17949425501258089_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17939145422393591_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17981986417712525_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17891232104649202_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18181153732221995_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17965743049912738_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18322376497040246_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17941725578359930_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17919068936608398_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17923137590540919_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17953906162980532_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17936901755511154_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17955870761041986_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17936111687237885_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17954040514913712_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17923322804426185_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17948164544016283_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17964050260855270_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17864749226772383_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18148827958261942_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17981392909592395_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17972050108664860_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18208978420087388_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17915923517543660_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17962897999837419_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17940610808241026_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18169663654240314_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18021739732400897_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17934058919502363_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18213928534198856_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17949138988930958_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17858925248747052_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17915277329581862_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17964180763795106_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17946124297977816_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17926352651433417_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17950862126001392_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17894388272649268_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17968338031668898_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17878256765704636_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17939713193185270_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17909573330502643_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17952577255939619_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_18049105366328377_high.jpg?tr=h-500",
  "https://cdn.stamped.io/uploads/instagram/197058_17900617976625383_high.jpg?tr=h-500",
];

function applyMasks(
  rawImage: RawImage,
  masks: ImageSegmentationPipelineOutput[]
): ImageData {
  const { width, height } = rawImage;
  const pixels = new Uint8ClampedArray(width * height * 4);
  rawImage.rgba();

  const masksByLabel = Object.fromEntries(
    masks.map(({ label, mask }) => [label, mask])
  );
  const labelsToHighlight = [
    "Upper-clothes",
    "Pants",
    "Left-shoe",
    "Right-shoe",
    "Dress",
    "Sunglasses",
    "Bag",
  ];

  for (let i = 0; i < width * height; i++) {
    const opacity = labelsToHighlight
      .flatMap((label) => masksByLabel[label]?.data[i] ?? [])
      .reduce((previous, current) => Math.max(previous, current), 0.2 * 255);

    pixels[i * 4 + 0] = rawImage.data[i * 4 + 0];
    pixels[i * 4 + 1] = rawImage.data[i * 4 + 1];
    pixels[i * 4 + 2] = rawImage.data[i * 4 + 2];
    pixels[i * 4 + 3] = opacity;
  }

  return new ImageData(pixels, width, height, {
    colorSpace: "srgb",
  });
}

// function downloadMasks(masks: ImageSegmentationPipelineOutput[]) {
//   for (const m of masks) {
//     m.mask.save(`${m.label}.png`);
//   }
// }

function App() {
  const [maskedImage, setMaskedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function doTheMagic(url: string) {
    setLoading(true);

    const segmenter = await pipeline(
      "image-segmentation",
      "Xenova/segformer_b2_clothes",
      { dtype: "q8" }
    );

    const rawImage = await RawImage.fromURL(url);
    const masks = await segmenter(rawImage);
    console.log(masks);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = rawImage.width;
    canvas.height = rawImage.height;

    const maskedImage = applyMasks(rawImage, masks);

    context?.putImageData(maskedImage, 0, 0);
    const dataURI = canvas.toDataURL();

    setLoading(false);
    setMaskedImage(dataURI);
  }

  return (
    <div className=" bg-stone-200">
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold underline text-blue-500 text-center">
          Clothes masking using Transformers.js
        </h1>

        <div
          className={[
            "flex justify-center my-4",
            loading ? "animate-pulse" : "",
          ].join(" ")}
        >
          {maskedImage ? (
            <img
              alt=""
              src={maskedImage}
              className="rounded w-[400px] h-[500px] object-cover"
            />
          ) : (
            <div className="w-[400px] h-[500px] bg-stone-300 rounded"></div>
          )}
        </div>

        <div className="grid grid-cols-6 gap-4">
          {images.map((image) => (
            <img
              key={image}
              alt=""
              src={image}
              width={200}
              onClick={() => doTheMagic(image)}
              className="cursor-pointer transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// https://www.insiderstore.com.br/
// Array.from(document.querySelectorAll('.stamped-instagram-media')).map(el=>el.style['background-image'].replace("url(\"",'').replace("\")",'')).filter(Boolean)
