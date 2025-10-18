import { useState, useEffect } from 'react';
import { MovieCard } from '../../lib/component';
import type { Movie } from '../../services/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Mock data para demonstração
  useEffect(() => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Avatar: O Caminho da Água',
        overview:
          'Ambientado mais de uma década após os eventos do primeiro filme, Avatar: O Caminho da Água conta a história da família Sully, os problemas que os perseguem, até onde vão para se manter seguros, as batalhas que lutam para se manter vivos e as tragédias que suportam.',
        poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        backdrop_path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
        release_date: '2022-12-14',
        vote_average: 7.6,
        vote_count: 9284,
        genre_ids: [878, 12, 28],
      },
      {
        id: 2,
        title: 'Top Gun: Maverick',
        overview:
          'Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete "Maverick" Mitchell está onde pertence, empurrando o envelope como um piloto de teste corajoso e esquivando-se do avanço na classificação que o aterraria.',
        poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        backdrop_path: '/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
        release_date: '2022-05-24',
        vote_average: 8.3,
        vote_count: 7892,
        genre_ids: [28, 18],
      },
      {
        id: 3,
        title: 'Pantera Negra: Wakanda Para Sempre',
        overview:
          "A rainha Ramonda, Shuri, M'Baku, Okoye e as Dora Milaje lutam para proteger sua nação das potências mundiais intervenientes após a morte do rei T'Challa. Quando Namor, rei de uma nação subaquática oculta, ameaça Wakanda, eles devem forjar um novo caminho para o reino.",
        poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
        backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
        release_date: '2022-11-09',
        vote_average: 7.1,
        vote_count: 5234,
        genre_ids: [28, 12, 18],
      },
      {
        id: 4,
        title: 'Homem-Aranha: Sem Volta Para Casa',
        overview:
          'Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, forçando-o a descobrir o que realmente significa ser o Homem-Aranha.',
        poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
        backdrop_path: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
        release_date: '2021-12-15',
        vote_average: 8.1,
        vote_count: 18567,
        genre_ids: [28, 12, 878],
      },
      {
        id: 5,
        title: 'Doutor Estranho no Multiverso da Loucura',
        overview:
          'O Doutor Stephen Strange continua sua pesquisa sobre a Joia do Tempo. Mas um velho amigo que virou inimigo põe fim aos seus planos e faz com que Strange desencadeie um mal indescritível.',
        poster_path: '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
        backdrop_path: '/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
        release_date: '2022-05-04',
        vote_average: 7.3,
        vote_count: 8945,
        genre_ids: [14, 28, 12],
      },
      {
        id: 6,
        title: 'Thor: Amor e Trovão',
        overview:
          'Thor embarca em uma jornada diferente de tudo que já enfrentou – uma busca pela paz interior. Mas sua aposentadoria é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses.',
        poster_path: '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
        backdrop_path: '/p1F51Lvj3sMopG948F5HsBbl43C.jpg',
        release_date: '2022-07-06',
        vote_average: 6.4,
        vote_count: 7123,
        genre_ids: [28, 12, 14],
      },
    ];
    setMovies(mockMovies);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <FontAwesomeIcon
          icon="clapperboard"
          className="text-6xl text-secondary mb-4"
        />
        <h1 className="text-4xl font-bold text-content-default">
          Filmes Populares
        </h1>
        <p className="text-lg text-content-ghost mt-4">
          Descubra os melhores filmes em cartaz
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            variant={index % 2 === 0 ? 'add' : 'remove'}
            onButtonClick={(movie, variant) => {
              console.log(
                `${variant === 'add' ? 'Adicionando' : 'Removendo'} filme:`,
                movie.title,
                `- Variant: ${variant}`
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
