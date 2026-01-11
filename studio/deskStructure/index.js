import {FaFolderOpen, FaSlidersH, FaQuoteLeft, FaQuestion, FaLightbulb} from 'react-icons/fa';

export const deskStructure = (S, context) => {
    return S.list()

        .title('Content')
        .items([
            // Site Settings
            S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
                .icon(FaSlidersH),

            S.divider(),

            // Quotes
            S.listItem()
                .title('Quotes')
                .icon(FaQuoteLeft)
                .child(S.documentTypeList('quote').title('All Quotes')),

            // Questions
            S.listItem()
                .title('Questions')
                .icon(FaQuestion)
                .child(S.documentTypeList('question').title('All Questions')),

            // Reflections
            S.listItem()
                .title('Reflections')
                .icon(FaLightbulb)
                .child(S.documentTypeList('reflection').title('All Reflections'))
        ]);
};
