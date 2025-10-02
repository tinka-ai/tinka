<form
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // arată mesajul tău de succes (ex. setState, toast etc.)
      form.reset();
      alert("Mulțumim! Mesajul a fost trimis.");
    } else {
      const j = await res.json().catch(() => ({}));
      alert("Eroare la trimitere: " + (j?.error ?? "încearcă din nou"));
    }
  }}
>
  {/* IMPORTANT: numează câmpurile exact așa */}
  <input name="name" required />
  <input name="email" type="email" required />
  <input name="phone" />
  <input name="company" />
  <select name="service">...</select>
  <select name="budget">...</select>
  <textarea name="message" required />
  <button type="submit">Trimite</button>
</form>
