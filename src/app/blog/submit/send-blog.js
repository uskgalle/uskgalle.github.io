export function sendBlog(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.name = `blog-submission-${crypto.randomUUID()}`;
    frame.hidden = true;
    frame.title = 'Blog submission';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = endpoint;
    form.target = frame.name;
    form.hidden = true;
    const input = document.createElement('input');
    input.name = 'payload';
    input.value = JSON.stringify(payload);
    form.append(input);
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener('message', receive);
      form.remove(); frame.remove();
    };
    const receive = (event) => {
      // HtmlService sandbox hosts use a -script suffix; some responses use
      // script.googleusercontent.com directly or its subdomains.
      if (!/^https:\/\/(?:script\.google\.com|script\.googleusercontent\.com|[a-z0-9-]+[.-]script\.googleusercontent\.com)$/.test(event.origin)) return;
      const result = event.data;
      if (result?.type !== 'blog-submission' || result.requestId !== payload.requestId || result.receiptToken !== payload.receiptToken) return;
      cleanup();
      if (result.ok === true) resolve(result);
      else {
        const failure = new Error(result.message || 'Your blog submission could not be saved. Please retry.');
        failure.canEdit = result.canEdit === true;
        reject(failure);
      }
    };
    window.addEventListener('message', receive);
    timer = setTimeout(() => {
      cleanup();
      reject(new Error('We could not confirm your submission. Please retry on this page; your reference prevents duplicate blog submissions.'));
    }, 90000);
    document.body.append(frame, form);
    try { form.submit(); } catch (error) { cleanup(); reject(error); }
  });
}

