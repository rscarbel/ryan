export default async function Testimonials() {
  return (
    <section
      id="testimonial-section"
      className="flex flex-col items-center justify-center"
    >
      <h2 className="original-h2">Testimonials</h2>

      <p className="original-p">
        Here&rsquo;s what previous work managers have said about Ryan:
      </p>

      <div id="testimonial-container">
        <div className="testimonial">
          <img
            alt="David Balfour"
            className="testimonial-picture shadow"
            src="https://ryanscarbel.com\assets\David-Balfour.jpg"
          />
          <h3 className="original-h3 testimonial-name">David Balfour</h3>

          <p className="original-p job-title">
            Meridian 3D &ndash; CAD Manager
          </p>

          <p className="original-p testimonial-content">
            &quot;Ryan Scarbel is a high energy person who is constantly
            striving to get results and is never satisfied unless he has
            investigated as many options as time permits. He has very pleasant
            inter-personal skills and understands the importance of contact
            building and long term relationships. On a personal level he was a
            great workmate and someone I would greatly enjoy working with in the
            future.&quot;
          </p>
        </div>

        <div className="testimonial">
          <img
            alt="Miles Jennings"
            className="testimonial-picture shadow"
            src="https://ryanscarbel.com\assets\Miles-Jennings.jpg"
          />
          <h3 className="original-h3 testimonial-name">Miles Jennings</h3>

          <p className="original-p job-title">
            Recruiter.com &ndash; Founder &amp; CEO
          </p>

          <p className="original-p testimonial-content">
            &quot;Ryan has done a lot of direct client work, marketing and sales
            outreach through Hubspot, marketing automation sequences, and
            partner calls. A bright and ambitious guy with technical skills and
            very strong communication and presentation, which is rare. This is
            someone you can put in front of clients and not think twice.&quot;
          </p>
        </div>

        <div className="testimonial">
          <img
            alt="Stacey Grant"
            className="testimonial-picture shadow"
            src="https://ryanscarbel.com\assets\StaceyGrant.jpg"
          />
          <h3 className="original-h3 testimonial-name">Stacey Grant</h3>

          <p className="original-p job-title">
            UNCG &ndash; Technology Support Analyst
          </p>

          <p className="original-p testimonial-content">
            &quot;His attention to detail and ability to learn on the fly has
            made him invaluable to us over the never ending periods of
            transition in the ITS computer labs. Ryan has such a pleasant
            demeanor about him and his customer service and technical skills are
            some of the best I have seen in my 15 years serving as Computer Lab
            Manager at UNCG. He is both dependable and always ready to go the
            last mile&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
