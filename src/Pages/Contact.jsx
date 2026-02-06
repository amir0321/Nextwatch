import React from 'react';

function Contact() {
    return (
        <section className="min-h-screen bg-slate-950 text-white pb-20">

            <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <figure className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-slate-950 to-slate-950 z-0"></figure>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 drop-shadow-lg">
                        Contact Us
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        If you have any questions or need assistance, please don't hesitate to contact us.
                    </p>
                </div>
            </header>

            <section className="max-w-3xl mx-auto px-6 -mt-20 relative z-20">
                <article className="glass p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">Get in Touch</h2>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white placeholder-slate-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white placeholder-slate-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white placeholder-slate-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                            <textarea
                                placeholder="Your message here..."
                                rows="5"
                                className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white placeholder-slate-500 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-1 mt-4"
                        >
                            Send Message
                        </button>
                    </form>

                </article>
            </section>
        </section>
    );
}

export default Contact;
