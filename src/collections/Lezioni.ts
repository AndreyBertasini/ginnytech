import type { CollectionConfig } from 'payload'

export const Lezioni: CollectionConfig = {
  slug: 'lezioni',
  admin: {
    useAsTitle: 'titolo',
    defaultColumns: ['titolo', 'categoria', 'livello', 'updatedAt'],
    group: 'Contenuti',
    description: 'Lezioni del sito GinnyTech.it',
  },
  fields: [
    {
      name: 'titolo',
      type: 'text',
      required: true,
      label: 'Titolo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'Identificatore URL (es. introduzione-python)',
      },
    },
    {
      name: 'descrizione',
      type: 'textarea',
      label: 'Descrizione',
      admin: {
        description: 'Breve descrizione che appare nell\'anteprima della lezione',
      },
    },
    {
      name: 'contenuto',
      type: 'richText',
      required: true,
      label: 'Contenuto',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'categoria',
          type: 'select',
          label: 'Categoria',
          admin: { width: '50%' },
          options: [
            { label: 'Python', value: 'python' },
            { label: 'SQL', value: 'sql' },
            { label: 'Analisi Dati', value: 'analisi-dati' },
            { label: 'Machine Learning', value: 'machine-learning' },
            { label: 'Data Engineering', value: 'data-engineering' },
            { label: 'Visualizzazione Dati', value: 'visualizzazione-dati' },
            { label: 'Business Intelligence', value: 'business-intelligence' },
            { label: 'Excel & Fogli di calcolo', value: 'excel' },
          ],
        },
        {
          name: 'livello',
          type: 'select',
          label: 'Livello',
          admin: { width: '50%' },
          options: [
            { label: 'Principiante', value: 'principiante' },
            { label: 'Intermedio', value: 'intermedio' },
            { label: 'Avanzato', value: 'avanzato' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'durata',
          type: 'number',
          label: 'Durata stimata (minuti)',
          admin: {
            width: '50%',
            description: 'Tempo di lettura stimato',
          },
        },
        {
          name: 'ordine',
          type: 'number',
          label: 'Ordine nel percorso',
          admin: {
            width: '50%',
            description: 'Posizione della lezione all\'interno del suo percorso',
          },
        },
      ],
    },
    {
      name: 'immagineCopertura',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine di copertina',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'valore',
          type: 'text',
          required: true,
          label: 'Tag',
        },
      ],
    },
    {
      name: 'lezionePrecedente',
      type: 'relationship',
      relationTo: 'lezioni',
      label: 'Lezione precedente',
      admin: {
        description: 'Collega alla lezione precedente dello stesso percorso',
      },
    },
    {
      name: 'lezioneSuccessiva',
      type: 'relationship',
      relationTo: 'lezioni',
      label: 'Lezione successiva',
      admin: {
        description: 'Collega alla lezione successiva dello stesso percorso',
      },
    },
    {
      name: 'dataPubblicazione',
      type: 'date',
      label: 'Data di pubblicazione',
    },
    {
      name: 'pubblicato',
      type: 'checkbox',
      label: 'Pubblicato',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
