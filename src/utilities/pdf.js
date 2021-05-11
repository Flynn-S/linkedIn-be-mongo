import axios from 'axios';
import PdfPrinter from 'pdfmake';
import { format } from 'date-fns';

const fetchImage = async (imgUrl) => {
  try {
    const resp = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    const result = Buffer.from(resp.data, 'base64');
    return result;
  } catch (error) {
    console.log('error from axios fetch img', error);
  }
};

// const content = async (data) => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// };

export const generatePdf = async (data) => {
  try {
    const image = await fetchImage(data.image);
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);

    const doc = {
      content: [
        {
          text: `${data.name} ${data.surname}'s CV`,
          style: 'header',
          fontSize: 18,
          bold: true,
          margin: [0, 15],
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: image,
              width: 119, // Full A4 size width.
              height: 153, // Full A4 size width.
              margin: [0, 0, 15, 0],
            },
            {
              text: `Name: ${data.name}
              Surname: ${data.surname}
              Title: ${data.title}
              Area: ${data.area}
              Email: ${data.email}
              `,
            },
          ],
        },
        {
          text: 'Experiences',
          style: 'header',
          margin: [0, 15],
          fontSize: 16,
        },
        ...data.experiences.map((exp) => ({
          text: `Company: ${exp.company}
              Role: ${exp.role}
              Description: ${exp.description}
              Area: ${exp.area}
              Start Date: ${format(exp.startDate, 'MM/dd/yyyy')}
              End Date: ${
                exp.endDate
                  ? format(exp.startDate, 'MM/dd/yyyy')
                  : 'Currently Working'
              }
              `,
        })),
      ],
      defaultStyle: {
        columnGap: 20,
        lineHeight: 1.5,
      },
    };
    const sourceStream = printer.createPdfKitDocument(doc);
    sourceStream.end();
    return sourceStream;
  } catch (error) {
    console.log('error in generatePDF', error);
  }
};
