import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

async function supabaseUpload(res, file_path, file) {
	const { data, error } = await supabase.storage
		.from("files")
		.upload(file_path, file);
	if (error) {
		res.status(500).send("An error ocurred when uploading to cloud storage");
		return;
	}
}

async function getSupabaseDownloadUrl(res, file_path) {
	const { data, error } = await supabase.storage
		.from("files")
		.createSignedUrl(file_path, 60, { download: true });
	if (error) {
		res.status(500).send("An error ocurred donwloading from cloud storage");
		return;
	}

	return data.signedUrl;
}

//takes an array of file urls and deletes them
async function supabaseDelete(res, file_paths) {
	const { data, error } = await supabase.storage
		.from("files")
		.remove(file_paths);
	if (error) {
		res.status(500).send("An error ocurred when deleting from cloud storage");
		return;
	}
}

export { supabaseUpload, getSupabaseDownloadUrl, supabaseDelete };
